import React from "react";

interface Props {
  params: {
    id: string;
    no: string;
  };
}
const PhotoPage = ({ params }: Props) => {
  return <div>PhotoPage {params.no}</div>;
};

export default PhotoPage;
