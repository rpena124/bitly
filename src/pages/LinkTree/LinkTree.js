import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function LinkTree() {
  const [userLinkTree, setuserLinkTree] = useState({});
  let { name } = useParams();

  const getUserLinkTree = async () => {
    try {
      const response = await fetch(`/api/users/linkTree/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setuserLinkTree(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserLinkTree();
  }, []);

  return (
    <>
      {userLinkTree.linkTree?.length
        ? userLinkTree.linkTree?.map((link, i) => {
            const { url, title } = link;
            return <li key={i}>{title ? title : url}</li>;
          })
        : "Add links to your Link Tree from your dashboard."}
    </>
  );
}
