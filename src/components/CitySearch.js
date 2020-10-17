import React, { useState } from "react";
import { Search } from "@vkontakte/vkui";
import https from "https";
import { request } from "http";

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

    let url =
      "https://kladr-api.ru/api.php?query=" +
      q.query +
      "&oneString=1&limit=1&withParent=1";
    let opts = {
      method: "GET",
      url: url,
      json: true,
    };

    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ users: json.data }));
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
