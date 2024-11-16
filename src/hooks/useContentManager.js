// hooks/useContentManager.js
import { useState, useCallback, useEffect } from "react";

const CONTENT_CACHE = new Map();
const PROGRESS_KEY = "ml_mastery_progress";

export function useContentManager(selectedPath) {
  const [state, setState] = useState({
    modules: [], // List of all modules
    moduleMetadata: null, // Current module's detailed metadata
    currentModule: null, // Current selected module
    currentConcept: null, // Current selected concept
    currentSection: null, // Current section within concept
    progress: {}, // Progress tracking
    isLoading: false,
    error: null,
  });

  // Load initial progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    if (savedProgress) {
      setState((prev) => ({
        ...prev,
        progress: JSON.parse(savedProgress),
      }));
    }
  }, []);

  // Load all modules for the selected path
  const loadModules = useCallback(async () => {
    if (!selectedPath) return;

    const cacheKey = `${selectedPath}_modules`;
    if (CONTENT_CACHE.has(cacheKey)) {
      return CONTENT_CACHE.get(cacheKey);
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch(`/content/${selectedPath}/modules.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      CONTENT_CACHE.set(cacheKey, data);

      setState((prev) => ({
        ...prev,
        modules: data.modules,
        isLoading: false,
      }));

      return data;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "NEURAL_MODULE_LIST_FAILED: " + error.message,
        isLoading: false,
      }));
      throw error;
    }
  }, [selectedPath]);

  // Load module metadata
  const loadModuleMetadata = useCallback(
    async (moduleId) => {
      if (!selectedPath || !moduleId) return null;

      const cacheKey = `${selectedPath}_${moduleId}_metadata`;
      if (CONTENT_CACHE.has(cacheKey)) {
        return CONTENT_CACHE.get(cacheKey);
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await fetch(
          `/content/${selectedPath}/${moduleId}/index.json`,
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        CONTENT_CACHE.set(cacheKey, data);

        setState((prev) => ({
          ...prev,
          moduleMetadata: data,
          isLoading: false,
        }));

        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "NEURAL_MODULE_METADATA_FAILED: " + error.message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [selectedPath],
  );

  // Load concept content
  const loadConceptContent = useCallback(
    async (moduleId, conceptId) => {
      if (!selectedPath || !moduleId || !conceptId) return null;

      const cacheKey = `${selectedPath}_${moduleId}_${conceptId}_content`;
      if (CONTENT_CACHE.has(cacheKey)) {
        return CONTENT_CACHE.get(cacheKey);
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await fetch(
          `/content/${selectedPath}/${moduleId}/concepts/${conceptId}.json`,
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        CONTENT_CACHE.set(cacheKey, data);

        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));

        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "NEURAL_CONCEPT_LOAD_FAILED: " + error.message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [selectedPath],
  );

  // Initialize modules when path changes
  useEffect(() => {
    if (selectedPath) {
      loadModules().catch(console.error);
    }
  }, [selectedPath, loadModules]);

  // Progress tracking functions
  const saveProgress = useCallback((newProgress) => {
    setState((prev) => {
      const updatedProgress = {
        ...prev.progress,
        ...newProgress,
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
      return {
        ...prev,
        progress: updatedProgress,
      };
    });
  }, []);

  const isItemCompleted = useCallback(
    (moduleId, conceptId, itemId) => {
      const moduleProgress = state.progress[moduleId] || {};
      const conceptProgress = moduleProgress[conceptId] || {};
      return conceptProgress[itemId] === true;
    },
    [state.progress],
  );

  const markItemCompleted = useCallback(
    (moduleId, conceptId, itemId) => {
      const newProgress = {
        ...state.progress,
        [moduleId]: {
          ...(state.progress[moduleId] || {}),
          [conceptId]: {
            ...(state.progress[moduleId]?.[conceptId] || {}),
            [itemId]: true,
          },
        },
      };
      saveProgress(newProgress);
    },
    [state.progress, saveProgress],
  );

  // Navigate to concept
  const navigateToConcept = useCallback(
    async (moduleId, conceptId) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Load module metadata first
        const metadata = await loadModuleMetadata(moduleId);
        if (!metadata) throw new Error("MODULE_METADATA_NOT_FOUND");

        // Load concept content
        const conceptContent = await loadConceptContent(moduleId, conceptId);
        if (!conceptContent) throw new Error("CONCEPT_CONTENT_NOT_FOUND");

        // Find current module from modules list
        const currentModule = state.modules.find((m) => m.id === moduleId);
        if (!currentModule) throw new Error("MODULE_NOT_FOUND");

        // Update state with all loaded content
        setState((prev) => ({
          ...prev,
          currentModule,
          moduleMetadata: metadata,
          currentConcept: conceptContent,
          isLoading: false,
          error: null,
        }));

        // Prefetch next concept if available
        const nextConcept = metadata.concepts.find(
          (c, i) =>
            i > metadata.concepts.findIndex((c) => c.id === conceptId) &&
            i <= metadata.concepts.findIndex((c) => c.id === conceptId) + 1,
        );

        if (nextConcept) {
          loadConceptContent(moduleId, nextConcept.id).catch(() => {});
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error.message,
          isLoading: false,
        }));
      }
    },
    [state.modules, loadModuleMetadata, loadConceptContent],
  );

  // Check prerequisites
  const checkPrerequisites = useCallback(
    (moduleId, conceptId) => {
      const module = state.moduleMetadata;
      if (!module) return true; // If no metadata loaded, don't block

      const concept = module.concepts.find((c) => c.id === conceptId);
      if (!concept) return true;

      // First concept is always unlocked
      if (module.concepts[0].id === conceptId) return true;

      // Check prerequisites if they exist
      if (!concept.prerequisites?.length) return true;

      return concept.prerequisites.every((prereq) => {
        if (typeof prereq === "string" && prereq.includes("/")) {
          // Handle cross-module prerequisites
          const [prereqModuleId, prereqConceptId] = prereq.split("/");
          return Object.values(
            state.progress[prereqModuleId]?.[prereqConceptId] || {},
          ).every(Boolean);
        }
        // Handle same-module prerequisites
        return Object.values(state.progress[moduleId]?.[prereq] || {}).every(
          Boolean,
        );
      });
    },
    [state.moduleMetadata, state.progress],
  );

  return {
    ...state,
    navigateToConcept,
    loadModuleMetadata,
    markItemCompleted,
    isItemCompleted,
    checkPrerequisites,
  };
}
