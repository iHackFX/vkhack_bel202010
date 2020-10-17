import React, { useState } from "react";
import { Search } from "@vkontakte/vkui";
import axios from "axios";

const CitySearch = ({ id, setViewAddresses }) => {
  const [searchValue, setSearchValue] = useState(null);
  function search(query) {
    var config = {
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://kladr-api.ru/api.php?query=" +
        query +
        "&oneString=1&limit=5&withParent=1",
      headers: {
        Origin: "http://localhost:10888",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (response.data.result !== undefined) {
          setViewAddresses(response.data.result);
        }
      })
      .catch(function (error) {});
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
