import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect, useContext, useCallback } from "react";

const usePortfolio = (all: boolean, ApiConfig?: any) => {
  const [portfolio, setPortfolio] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [openEditTag, setOpenEditTag] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const getPortfolio = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/backend/portfolio?page_number=${pageNumber}&all=${all}`
      );

      setTotalRows(data?.rows);
      setPerPage(data?.perPage);
      setPortfolio(data?.projects);
    } catch (e: any) {}
  }, [pageNumber, all]);

  const addProject = useCallback(async () => {
    const formData = new FormData();
    formData.append("title", "New project");
    formData.append("text", "<div></div>");

    try {
      const { data } = await axios.post(
        `/backend/portfolio`,
        formData,
        ApiConfig
      );

      getPortfolio();

      toast.success(data?.msg);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [ApiConfig]);

  const deleteProject = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.delete(
          `/backend/portfolio/${id}`,
          ApiConfig
        );

        getPortfolio();

        toast.success(data?.msg);
      } catch (e: any) {
        toast.error(e?.response?.data?.msg);
      }
    },
    [ApiConfig]
  );

  const editProject = useCallback(
    async (e: any, project: any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", project?.title);
      formData.append("text", project?.text);
      formData.append("image", project?.image);
      console.log(project?.tags);
      project?.tags?.forEach((tag: string) => formData.append("tags", tag));

      try {
        const { data } = await axios.put(
          `/backend/portfolio/${project?.id}`,
          formData,
          ApiConfig
        );

        getPortfolio();

        toast.success(data?.msg);
      } catch (e: any) {
        toast.error(e?.response?.data?.msg);
      }
    },
    [ApiConfig]
  );

  const getTags = useCallback(async () => {
    try {
      const { data } = await axios.get(`/backend/portfolio/tag`);

      setTags(data);
    } catch (e: any) {}
  }, []);

  const addTag = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `/backend/portfolio/tag`,
        {
          name: "New Tag",
          color_hex: "#FFFFFF",
        },
        ApiConfig
      );

      getTags();

      toast.success(data?.msg);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [ApiConfig]);

  const editTag = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `/backend/portfolio/tag/${selectedTag?.id}`,
          selectedTag,
          ApiConfig
        );

        getTags();

        toast.success(data?.msg);
        setOpenEditTag(false);
      } catch (e: any) {
        toast.error(e?.response?.data?.msg);
      }
    },
    [selectedTag, ApiConfig]
  );

  const deleteTag = useCallback(async () => {
    try {
      const { data } = await axios.delete(
        `/backend/portfolio/tag/${selectedTag?.id}`,
        ApiConfig
      );

      getTags();
      getPortfolio();

      toast.success(data?.msg);
      setOpenEditTag(false);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [selectedTag, ApiConfig]);

  useEffect(() => {
    getPortfolio();
    getTags();
  }, []);

  useEffect(() => {
    getPortfolio();
  }, [pageNumber]);

  return {
    portfolio,
    tags,
    openEditTag,
    selectedTag,
    pageNumber,
    totalRows,
    perPage,
    setPageNumber,
    setSelectedTag,
    setOpenEditTag,
    setPortfolio,
    addProject,
    deleteProject,
    editProject,
    setTags,
    addTag,
    deleteTag,
    editTag,
  };
};

export default usePortfolio;
