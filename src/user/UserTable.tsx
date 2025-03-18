import { FunctionComponent, useEffect, useState } from "react";
import { Loader, XCircle, ChevronUp, ChevronDown } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

export const UserTable: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterLetter, setFilterLetter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => filterLetter === "All" || user.name.startsWith(filterLetter),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* Loading and Error State */}
      {loading ? (
        <div className="flex justify-center items-center text-blue-500">
          <Loader className="animate-spin" size={24} />
          <span className="ml-2">Loading users...</span>
        </div>
      ) : error ? (
        <div className="flex items-center text-red-500">
          <XCircle size={24} />
          <span className="ml-2">{error}</span>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex space-x-2">
            {["All", "A", "B", "C", "D"].map((letter) => (
              <button
                key={letter}
                onClick={() => setFilterLetter(letter)}
                className={`px-3 py-2 rounded border ${
                  filterLetter === letter
                    ? "bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-black hover:bg-gray-100"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="mt-2 px-3 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
          >
            Sort by Name{" "}
            {sortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* User Table */}
          {sortedUsers.length > 0 ? (
            <div className="mt-4 border border-gray-300 rounded overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Company</th>
                    <th className="px-4 py-2 border-b">City</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.company.name}</td>
                      <td className="px-4 py-2">{user.address.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No users found.</p>
          )}
        </>
      )}
    </div>
  );
};
