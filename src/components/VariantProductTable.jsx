
export const VariantProductTable = ({
  skus,
  setSkus,
}) => {
  const handleDeleteTheVariant = (id) => {
    const filterTheVariant = skus.filter((item) => item.variationId !== id);
    setSkus([...filterTheVariant]);
  };

  // console.log(skus)
  return (
    skus.length > 0 && (
      <div>
        <h1 className="text-center lg:text-xl mt-9 mb-5 font-bold">
          Check your added Variant of The Product
        </h1>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-center table-auto min-w-max">
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
                   Purchase Price
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Stock
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
                  <tr key={item?.variationId} className="">
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.sku}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.purchasePrice}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.stock}
                      </p>
                    </td>
                    <td className="p-4  border-b border-blue-gray-50">
                      <p
                        onClick={() => handleDeleteTheVariant(item.variationId)}
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


