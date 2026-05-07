"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading projects...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Portfolio Projects</h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
