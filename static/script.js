class Item {
    constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
    }
  
    toTableRow() {
      return `
        <tr>
          <td>${this.name}</td>
          <td>${this.quantity}</td>
          <td>
            <button onclick="updateItem('${this.name}')">Update</button>
            <button onclick="deleteItem('${this.name}')">Delete</button>
          </td>
        </tr>
      `;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("item-form");
    const itemsList = document.getElementById("items-list");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const quantity = document.getElementById("quantity").value;
  
      const item = new Item(name, quantity);
  
      fetch("/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(data => {
        form.reset();
        fetchItems();
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  
    function fetchItems() {
      fetch("/items")
        .then(response => response.json())
        .then(items => {
          let tableContent = "";
          items.forEach(item => {
            const itemObj = new Item(item.name, item.quantity);
            tableContent += itemObj.toTableRow();
          });
          itemsList.innerHTML = tableContent;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  
    function updateItem(name) {
      const quantity = prompt("Enter new quantity:");
      if (quantity !== null) {
        fetch(`/items/${name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity
          })
        })
        .then(response => response.json())
        .then(data => {
          fetchItems();
        })
        .catch(error => {
          console.error("Error:", error);
        });
      }
    }
  
    function deleteItem(name) {
      if (confirm("Are you sure you want to delete this item?")) {
        fetch(`/items/${name}`, {
          method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
          fetchItems();
        })
        .catch(error => {
          console.error("Error:", error);
        });
      }
    }
  
    fetchItems();
  });
  