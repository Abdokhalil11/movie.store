import React, { useState, useEffect, useContext } from "react";
import { apiContext } from "../../Api_Context";
import useFetch from "../UseFetch/useFetch";
const GetGenre = ({ genre_ids, filmType, action =()=>{}}) => {
  const { url, key } = useContext(apiContext);
  const { data: allGenre } = useFetch("/3/genre/" + filmType + "/list");
  return genre_ids !== "all"
    ? allGenre?.genres.map(({ id, name }) =>
        genre_ids?.map((el) => el === id && <span key={id}>{name}</span>)
      )
    : allGenre?.genres.map(({ name,id }) => (
        <span key={name} data-id={id} onClick={action} >
          {name}
        </span>
      ));
};

export default React.memo(GetGenre);
