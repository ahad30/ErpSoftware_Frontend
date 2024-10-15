import { func } from "prop-types";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { Select } from "antd";

const Search = (
  // { setSingleScanCode }

) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    console.log(search)
    // if (search) {
    //   setSingleScanCode(search);
    // } else {
    //   setSingleScanCode("");
    // }
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <div className="relative flex">




<div className="w-full">
<div className="md:hidden">

    <Select
    allowClear={true}
    showSearch
    placeholder=""
    style={{width:"100%"}}
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    suffixIcon={<CiSearch size={20}/>}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />
</div>

<div className="hidden md:block">
<form className="" onSubmit={handleSubmit} action="">
          <input
            type="text"
            id="Search"
            name="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by Product Name/Scan code..."
            className="w-full rounded-lg py-2 px-3 border border-gray-200 pe-10 shadow-sm sm:text-sm outline-none focus:ring-1 focus:shadow-md"
          />
        </form>

        <div className="absolute right-2 top-0 bottom-0 flex justify-center items-center gap-x-3">
          <RxCross2
            className={`cursor-pointer duration-700 ${text ? "" : "w-0"}`}
            onClick={() => {
              setText("");
              // setSingleScanCode("");
            }}
            size={25}
          ></RxCross2>
          <CiSearch
            className="hover cursor-pointer hover:text-red-500"
            // onClick={() => setSingleScanCode(text)}
            size={25}
          ></CiSearch>
        </div>
</div>
</div>
      
  
    </div>
  );
};

export default Search;
Search.propTypes = {
  setSingleScanCode: func,
};
