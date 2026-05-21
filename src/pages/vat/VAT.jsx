import React from "react";
import { useAddNewVat, useGetVat } from "../../hooks/vat/useVat";
import Loading from "../../components/Loading";

export default function VAT() {
  const { isError, isLoading, data } = useGetVat();
  const { isPending, mutateAsync } = useAddNewVat();
  return (
    <div>
      <h3 className="text-xl mb-3">Shipping & VAT</h3>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="bg-white p-5">
          <p className="font-semibold">
            Current Shipping Rate: AED {data?.shippingRate || 0}
          </p>
          <p className="font-semibold">Current VAT: {data?.VAT || 0} %</p>
        </div>
      )}
      <form
        className="flex flex-col gap-2 mt-10 p-5 bg-white rounded-md"
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.target);
          const data = Object.fromEntries(formdata);
          await mutateAsync(data);
          e.target.reset();
        }}
      >
        <label>Shipping cost (AED)</label>
        <input
          type="number"
          name="shipping"
          required
          className="p-2 bg-gray-100 rounded-md"
        />
        <label>VAT (%)</label>
        <input
          type="number"
          required
          name="vat"
          className="p-2 bg-gray-100 rounded-md"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-black text-white mt-2 hover:bg-black/80"
        >
          {isPending ? "....." : "Submit"}
        </button>
      </form>
    </div>
  );
}
