import React, { useState } from "react";



const AddPurchase = () => {
  const [tableData, setTableData] = useState([]);

  const productData =  [
    {
        "productID": 27,
        "productType": "0",
        "productTitle": "Iphone 15 pro max 110",
        "productSubtitle": "The best brand in the mobile world",
        "productDescription": "dfgsdfgdfghdfgdfgdfgdfgdfgdfgdfgdfg",
        "productInitialQty": 0,
        "productPurchasePrice": 0,
        "productRetailPrice": 0,
        "productWholeSalesPrice": 0,
        "productMinQty": 0,
        "productMaxQty": 0,
        "productUnitID": null,
        "businessID": "3",
        "variationID": null,
        "isAllBranch": true,
        "branchIDs": "[1,2]",
        "notAvailableBranchIDs": "[3]",
        "isActive": true,
        "isInHouseAvailable": false,
        "isPickupAvailable": true,
        "isDeliveryAvailable": false,
        "isUsedForOnline": false,
        "isUsedForPOS": false,
        "isFeatured": false,
        "isColorVariations": false,
        "sku": "",
        "isVATApplicable": true,
        "isSDApplicable": false,
        "isCombo": false,
        "numberOfSubProducts": 0,
        "isSocialSubtitle": false,
        "socialSubtitle": null,
        "isSocialDescription": false,
        "socialDescription": null,
        "createdAt": "2024-12-31T07:23:10.000Z",
        "updatedAt": "2025-01-02T09:45:11.000Z",
        "productVariant": [
            {
                "productVariantID": 8,
                "attributeID": null,
                "attributes": null,
                "productID": 27,
                "sku": "4-64-Silver",
                "is_downloadable": false,
                "is_virtual": false,
                "stock": 1,
                "min_stock": 1,
                "max_stock": 1,
                "salePrice": "1.00",
                "purchasePrice": "1.00",
                "wholeSalePrice": "1.00",
                "retailPrice": "1.00",
                "serialNo": "1",
                "qrCode": "1",
                "expiryDate": null,
                "productImage": "",
                "is_warranty": true,
                "is_guaranty": true,
                "status": true,
                "createdAt": "2024-12-31T07:23:11.000Z",
                "updatedAt": "2024-12-31T07:23:11.000Z",
                "attribute_combination": [
                    {
                        "attributeCombinationID": 22,
                        "attributeName": "Ram",
                        "attributeValue": "4",
                        "productVariantID": 8,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    },
                    {
                        "attributeCombinationID": 23,
                        "attributeName": "Rom",
                        "attributeValue": "64",
                        "productVariantID": 8,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    },
                    {
                        "attributeCombinationID": 24,
                        "attributeName": "Color",
                        "attributeValue": "Silver",
                        "productVariantID": 8,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    }
                ]
            },
            {
                "productVariantID": 9,
                "attributeID": null,
                "attributes": null,
                "productID": 27,
                "sku": "6-128-Titanium",
                "is_downloadable": false,
                "is_virtual": false,
                "stock": 1,
                "min_stock": 1,
                "max_stock": 1,
                "salePrice": "1.00",
                "purchasePrice": "1.00",
                "wholeSalePrice": "1.00",
                "retailPrice": "1.00",
                "serialNo": "2",
                "qrCode": "2",
                "expiryDate": null,
                "productImage": "",
                "is_warranty": true,
                "is_guaranty": true,
                "status": true,
                "createdAt": "2024-12-31T07:23:12.000Z",
                "updatedAt": "2024-12-31T07:23:12.000Z",
                "attribute_combination": [
                    {
                        "attributeCombinationID": 25,
                        "attributeName": "Ram",
                        "attributeValue": "6",
                        "productVariantID": 9,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    },
                    {
                        "attributeCombinationID": 26,
                        "attributeName": "Rom",
                        "attributeValue": "128",
                        "productVariantID": 9,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    },
                    {
                        "attributeCombinationID": 27,
                        "attributeName": "Color",
                        "attributeValue": "Titanium",
                        "productVariantID": 9,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2024-12-31T07:23:12.000Z",
                        "updatedAt": "2024-12-31T07:23:12.000Z"
                    }
                ]
            }
        ]
    },
    {
        "productID": 31,
        "productType": "0",
        "productTitle": "Unsalted Butter",
        "productSubtitle": "Butter",
        "productDescription": "est",
        "productInitialQty": 0,
        "productPurchasePrice": 0,
        "productRetailPrice": 0,
        "productWholeSalesPrice": 0,
        "productMinQty": 0,
        "productMaxQty": 0,
        "productUnitID": null,
        "businessID": "4",
        "variationID": null,
        "isAllBranch": true,
        "branchIDs": "[3,1]",
        "notAvailableBranchIDs": "[3]",
        "isActive": true,
        "isInHouseAvailable": false,
        "isPickupAvailable": true,
        "isDeliveryAvailable": false,
        "isUsedForOnline": false,
        "isUsedForPOS": false,
        "isFeatured": false,
        "isColorVariations": false,
        "sku": "",
        "isVATApplicable": true,
        "isSDApplicable": false,
        "isCombo": false,
        "numberOfSubProducts": 0,
        "isSocialSubtitle": false,
        "socialSubtitle": null,
        "isSocialDescription": false,
        "socialDescription": null,
        "createdAt": "2025-01-05T03:46:30.000Z",
        "updatedAt": "2025-01-05T03:46:30.000Z",
        "productVariant": [
            {
                "productVariantID": 12,
                "attributeID": null,
                "attributes": null,
                "productID": 31,
                "sku": "L",
                "is_downloadable": false,
                "is_virtual": false,
                "stock": 5,
                "min_stock": 5,
                "max_stock": 5,
                "salePrice": "650.00",
                "purchasePrice": "500.00",
                "wholeSalePrice": "530.00",
                "retailPrice": "650.00",
                "serialNo": "1",
                "qrCode": "1111",
                "expiryDate": null,
                "productImage": "",
                "is_warranty": true,
                "is_guaranty": true,
                "status": true,
                "createdAt": "2025-01-05T03:46:30.000Z",
                "updatedAt": "2025-01-05T03:46:30.000Z",
                "attribute_combination": [
                    {
                        "attributeCombinationID": 32,
                        "attributeName": "Size",
                        "attributeValue": "L",
                        "productVariantID": 12,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2025-01-05T03:46:30.000Z",
                        "updatedAt": "2025-01-05T03:46:30.000Z"
                    }
                ]
            },
            {
                "productVariantID": 13,
                "attributeID": null,
                "attributes": null,
                "productID": 31,
                "sku": "S",
                "is_downloadable": false,
                "is_virtual": false,
                "stock": 5,
                "min_stock": 5,
                "max_stock": 5,
                "salePrice": "650.00",
                "purchasePrice": "500.00",
                "wholeSalePrice": "530.00",
                "retailPrice": "650.00",
                "serialNo": "2",
                "qrCode": "2222",
                "expiryDate": null,
                "productImage": "",
                "is_warranty": true,
                "is_guaranty": true,
                "status": true,
                "createdAt": "2025-01-05T03:46:30.000Z",
                "updatedAt": "2025-01-05T03:46:30.000Z",
                "attribute_combination": [
                    {
                        "attributeCombinationID": 33,
                        "attributeName": "Size",
                        "attributeValue": "S",
                        "productVariantID": 13,
                        "businessID": null,
                        "branchID": null,
                        "createdAt": "2025-01-05T03:46:30.000Z",
                        "updatedAt": "2025-01-05T03:46:30.000Z"
                    }
                ]
            }
        ]
    },
    {
        "productID": 28,
        "productType": "1",
        "productTitle": "Green Apple",
        "productSubtitle": "Green afuse big apples",
        "productDescription": "asdasdasdasd",
        "productInitialQty": 1,
        "productPurchasePrice": 1,
        "productRetailPrice": 1,
        "productWholeSalesPrice": 1,
        "productMinQty": 1,
        "productMaxQty": 1,
        "productUnitID": null,
        "businessID": "3",
        "variationID": null,
        "isAllBranch": true,
        "branchIDs": "[2]",
        "notAvailableBranchIDs": "[1]",
        "isActive": true,
        "isInHouseAvailable": false,
        "isPickupAvailable": true,
        "isDeliveryAvailable": false,
        "isUsedForOnline": false,
        "isUsedForPOS": false,
        "isFeatured": false,
        "isColorVariations": false,
        "sku": "asdsadsad",
        "isVATApplicable": true,
        "isSDApplicable": false,
        "isCombo": false,
        "numberOfSubProducts": 0,
        "isSocialSubtitle": false,
        "socialSubtitle": null,
        "isSocialDescription": false,
        "socialDescription": null,
        "createdAt": "2024-12-31T07:59:18.000Z",
        "updatedAt": "2024-12-31T07:59:18.000Z",
        "productVariant": []
    },
    {
        "productID": 29,
        "productType": "1",
        "productTitle": "Red T Shirt",
        "productSubtitle": "asdsad",
        "productDescription": "asdasdasd",
        "productInitialQty": 50,
        "productPurchasePrice": 400,
        "productRetailPrice": 500,
        "productWholeSalesPrice": 600,
        "productMinQty": 60,
        "productMaxQty": 70,
        "productUnitID": null,
        "businessID": "3",
        "variationID": null,
        "isAllBranch": true,
        "branchIDs": "[1,2]",
        "notAvailableBranchIDs": "[3]",
        "isActive": true,
        "isInHouseAvailable": false,
        "isPickupAvailable": true,
        "isDeliveryAvailable": false,
        "isUsedForOnline": false,
        "isUsedForPOS": false,
        "isFeatured": false,
        "isColorVariations": false,
        "sku": "fghfggfh",
        "isVATApplicable": true,
        "isSDApplicable": false,
        "isCombo": false,
        "numberOfSubProducts": 0,
        "isSocialSubtitle": false,
        "socialSubtitle": null,
        "isSocialDescription": false,
        "socialDescription": null,
        "createdAt": "2024-12-31T10:48:11.000Z",
        "updatedAt": "2024-12-31T10:48:11.000Z",
        "productVariant": []
    }
]

  const handleSearch = (searchTerm) => {
    // Find the product based on the search term
    const product = productData.find(
      (item) =>
        item.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!product) {
      alert("Product not found");
      return;
    }

    if (product.productVariant.length > 0) {
      // If the product has variants, add each variant to the table
       const variants = product.productVariant.map((variant) => ({
        productID: product.productID,
        quantity: 1,
        productTitle: product.productTitle,
        sku: variant.sku,
        stock: variant.stock,
        salePrice: variant.salePrice,
        purchasePrice: variant.purchasePrice,
        productVariantID: variant.productVariantID,
        attributes: variant.attribute_combination.map(
          (attr) => `${attr.attributeName}: ${attr.attributeValue}`
        ).join(", "),
      }));

      setTableData((prevData) => [...prevData, ...variants]);
    } 
    else {
      // If no variants, add the product itself
      const productEntry = {
        productID: product.productID,
        productTitle: product.productTitle,
        sku: product.sku || "N/A",
        stock: product.productInitialQty,
        salePrice: product.productRetailPrice,
        purchasePrice: product.productPurchasePrice,
        attributes: "No Variants",
        quantity: 1
      };

      setTableData((prevData) => [...prevData, productEntry]);
    }
  };

  const handleDelete = (productID, productVariantID = null) => {
    setTableData((prevData) =>
      prevData.filter(
        (item) =>
          item.productID !== productID ||
          (productVariantID && item.productVariantID !== productVariantID)
      )
    );
  };
  console.log(tableData);

  return (
    <div>
      <h2>Add Purchase</h2>
      <input
        type="text"
        placeholder="Search Product"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Product Title</th>
          
            <th>Stock</th>
            <th>Sale Price</th>
            <th>Purchase Price</th>
           
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr className="text-center" key={item.productVariantID || item.productID}>
              <td>
                <p>{item.productTitle}</p>
                <p className="text-sm">({item.attributes})</p>
              </td>
            
              <td>{item.stock}</td>
              <td>{item.salePrice}</td>
              <td>{item.purchasePrice}</td>
             
              <td>
              <button
                  onClick={() =>
                    handleDelete(item.productID, item.productVariantID)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPurchase;
