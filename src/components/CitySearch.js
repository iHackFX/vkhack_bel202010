import React, { useState } from "react";
import { Search } from "@vkontakte/vkui";
import { search } from "./Requests";

const CitySearch = ({ id, setViewAddresses, setPubConversations }) => {
  const [searchValue, setSearchValue] = useState(null);
  return (
    <Search
      id={id}
      onEmptied={() => setPubConversations(null)}
      onIconClick={() => setPubConversations(null)}
      onChange={() => {
        var query = document.getElementById(id).value;
        setSearchValue(query);
        if (query.length > 3) {
          search(searchValue, setViewAddresses);
        }else{
          setViewAddresses(null);
        }
      }
    }
      after={null}
    ></Search>
  );
};

export default CitySearch;
