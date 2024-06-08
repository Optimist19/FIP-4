import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {useNavigate, useParams } from "react-router-dom";


function EditModal() {
  const [inputValue, setInputValue] = useState({
    name: "",
    age: "",
    colour: ""
  });

  const navigate = useNavigate()
  const params = useParams();
  const id = params.id;



  async function getPost() {
    try {
      const data = await fetch(
        "https://crudcrud.com/api/eb8ae8e91dbf42aeb0a8c01364326fc9/unicorns/" + id
      );
      const response = await data.json();
      console.log(response, "response");
      

      setInputValue({
        ...inputValue,
        name: response.name,
        age: response.age,
        colour: response.colour
      });

      
    } catch (err) {
      console.log(err, "err");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  function closeEdit() {
    navigate("/")
  }

  async function updatePost(e) {
    e.preventDefault();
  

    try {
      const response = await fetch(
        "https://crudcrud.com/api/eb8ae8e91dbf42aeb0a8c01364326fc9/unicorns/" +
          id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: inputValue.name,
            age: inputValue.age,
            colour: inputValue.colour
          })
        }
      );

      console.log(response)





      navigate("/")
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <form onSubmit={updatePost}>
      <div className="w-[full] px-4">
        <div className="flex justify-center items-center flex-col gap-2">
          <p className="text-red-400">
            Make changes to your profile here. Click save when you&apos;re done.
          </p>

          <Input
            type="text"
            name="name"
            value={inputValue.name}
            placeholder="name"
            onChange={handleChange}
          />

          <Input
            type="number"
            name="age"
            value={inputValue.age}
            placeholder="age"
            onChange={handleChange}
          />

          <Input
            type="text"
            name="colour"
            value={inputValue.colour}
            placeholder="colour"
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <Button onClick={closeEdit}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditModal;