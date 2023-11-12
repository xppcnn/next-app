"use client";
import React from "react";
import { Button } from "@nextui-org/button";

const AddToCart = () => {
  return (
    <div>
      <Button onClick={() => console.log("click")} color="primary">add to cart</Button>
    </div>
  );
};

export default AddToCart;
