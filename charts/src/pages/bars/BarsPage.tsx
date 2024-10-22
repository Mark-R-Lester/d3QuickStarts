import React from "react";
import { useParams } from "react-router-dom"

export default function BarsPage() {
  let { id } = useParams();
  return (
    <>
      <h1>Some bars {id}</h1>
    </>
  )
}