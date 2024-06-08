import { useEffect, useState } from "react";
import "../App.css";
// import { Button } from './components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import loader from "../assets/ZKZg.gif";

import { TiDelete } from "react-icons/ti";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    age: "",
    colour: ""
  });

  useEffect(() => {
    getPost()
    return () => {
      getPost();
    };
  }, []);

  async function getPost() {
    try {
      const data = await fetch(
        "https://crudcrud.com/api/eb8ae8e91dbf42aeb0a8c01364326fc9/unicorns"
      );
      const response = await data.json();
    
      setData(response);
    } catch (err) {
      console.log(err, "err");
    }
  }




  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  async function createPost(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://crudcrud.com/api/eb8ae8e91dbf42aeb0a8c01364326fc9/unicorns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            name: inputValue.name,
            age: inputValue.age,
            colour: inputValue.colour
          })
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data, "res");
    } catch (err) {
      console.error("There was a problem with the fetch operation:", err);
    }
    (inputValue.name = ""), (inputValue.age = ""), (inputValue.colour = "");

    location.reload();
  }

  async function delFtn(id) {
    const res = await fetch(
      "https://crudcrud.com/api/eb8ae8e91dbf42aeb0a8c01364326fc9/unicorns/" +
        id,
      {
        method: "DELETE"
      }
    );

    console.log(res, "first");
    location.reload();
  }


  if (data.length === 0) {
    return (
      <div className="h-full">
        <div>
          <div className=" flex items-center justify-center">
            <img className="w-[10vw]" src={loader} alt="a-loader-pic" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="h-full">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item._id.slice(0, 5)}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.colour}</TableCell>

                    <TableCell>
                      <TableCell className="  ">
                        <TableCell className=" ">
                          <Link to={`/edit-profile/${item._id}`}>
                            <Button>Edit</Button>
                          </Link>
                        </TableCell>
                      </TableCell>
                    </TableCell>

                    <TableCell className="text-right cursor-pointer">
                      <TiDelete
                        onClick={() => {
                          delFtn(item._id);
                        }}
                        className="text-red-700 text-xl"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div>
          <form onSubmit={createPost}>
            <Input
              type="text"
              name="name"
              value={inputValue.name}
              placeholder="name"
              onChange={handleChange}
              className="mt-3"
            />
            <Input
              type="number"
              name="age"
              value={inputValue.age}
              placeholder="age"
              onChange={handleChange}
              className="mt-3"
            />
            <Input
              type="type"
              name="colour"
              value={inputValue.colour}
              placeholder="colour"
              onChange={handleChange}
              className="mt-3"
            />
            {/* <Input type="number" name="userId" value={userId}  placeholder="userId" onChange={handleChange}/> */}
            <Button className="mt-3">Add</Button>
          </form>

          {/* <EditModal
          name="item.name"
          id="item._id"
          age="item.age"
          colour="item.colour"
        /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
