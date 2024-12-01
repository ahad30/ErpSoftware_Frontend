import { TPerSkus } from "../../Pages/Dashboard/Admin/Products/AddProduct";

export const VariantProductTable = ({
  skus,
  setSkus,
}) => {
  const handleDeleteTheVariant = (id) => {
    const filterTheVariant = skus.filter((item) => item.id !== id);
    setSkus([...filterTheVariant]);
  };
  return (
    skus.length > 0 && (
      <div>
        <h1 className="text-center mb-5">
          Check your added Variant of The Product
        </h1>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Serial
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Attributes Value
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    price
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Quantity
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {skus.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.sku}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.price}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.quantity}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p
                        onClick={() => handleDeleteTheVariant(item.id)}
                        className="block cursor-pointer bg-red-500 text-white px-1 py-2  mx-auto text-center font-sans text-sm antialiased font-normal leading-normal rounded-md"
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

// const = [
//   {color: "black", size: "xl" , storage : "128"},
//   {color: "Black", size: "5xl" , storage : "128"},
//   { storage : "128" , color: "Black", size: "5xl" ,},

// ]
