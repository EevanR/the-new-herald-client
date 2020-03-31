import React, { useEffect, useState } from "react";
import { getHeadlines } from "../modules/article"

const Headlines = () => {
  const loadHeadlines = async () => {
    let response = await getHeadlines();
    if (response.status === 200) {

    } else {

    }
  }
  
  return (
    <>
      <h1>Headlines</h1>
    </>
  )

}

export default Headlines;