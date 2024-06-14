import React, { useEffect, useState } from "react";

const fetchData = async (setUsers) => {
  await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.log(error));
};

const onAdd = async (name, email, setUsers) => {
  await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.status !== 201) {
        return;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      setUsers((users) => [...users, data]);
    })
    .catch((error) => console.log(error));
};

const onEdit = async (id, name, email, setUsers, users) => {
  await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      // setUsers((users) => [...users, data]);
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          user.name = name;
          user.email = email;
        }

        return user;
      });

      setUsers((users) => updatedUsers);
    })
    .catch((error) => console.log(error));
};

const onDelete = async (id, setUsers, users) => {
  await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status !== 200) {
        return;
      } else {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        );
      }
    })
    .catch((error) => console.log(error));
};
