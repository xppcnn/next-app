import React from "react";

interface Props {
  params: {
    slug: string[] | undefined;
  };
  searchParams: {
    sortOrder: string;
  };
}
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      ProductPage {slug?.join("-")} {sortOrder}
    </div>
  );
};

export default ProductPage;
