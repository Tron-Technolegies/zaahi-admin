import CategoryTable from "../../components/categories/CategoryTable";
import DialogTable from "../../components/categories/DialogTable";
import { useGetCategories } from "../../hooks/categories/useCategory";

export default function Categories() {
  const { isError, isLoading, error, data } = useGetCategories();
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">Categories</h1>
        <DialogTable />
      </div>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <CategoryTable data={data} />
      )}
    </div>
  );
}
