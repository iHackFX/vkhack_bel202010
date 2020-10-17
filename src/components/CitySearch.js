import React, { useState } from "react";
import { Search } from "@vkontakte/vkui";
import kladrApi from "kladrapi-for-node";

const Kladr = new kladrApi();
const CitySearch = ({ id }) => {
  const [searchValue, setSearchValue] = useState(null);
  function search(query) {
    var q = query.split(",");
    switch (q.length) {
      case 1:
        q = { query: q[0], contentType: "city", withParent: 0 };
        break;
      case 2:
        q = { query: q[1], contentType: "street", withParent: 0 };
        break;
      case 3:
        q = { query: q[2], contentType: "building", withParent: 0 };
        break;
    }
    Kladr.getData(q, (err, result) => {
      console.log(err, result);
    });
  }

  return (
    <Search
      id={id}
      onChange={() => {
        var query = document.getElementById(id).value;
        setSearchValue(query);
        if (query.length > 3) {
          search(searchValue);
        }
      }}
      after={null}
    ></Search>
  );
};

export default CitySearch;
