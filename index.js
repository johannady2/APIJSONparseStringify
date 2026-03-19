import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const getJSONData = (clickedChoice) =>
{
 
  const obj = JSON.parse(recipeJSON);
  let results = [];
  
  for (let i = 0; i < obj.length; i++)
  {
      let proteinIngredient1 = `${obj[i].ingredients.protein.name}, ${obj[i].ingredients.protein.preparation}`;
      let salsaIngredient1 = `${obj[i].ingredients.salsa.name}, ${obj[i].ingredients.salsa.spiciness}`;
      let toppingsArray1 = obj[i].ingredients.toppings;
      let toppingsStringsArray1 = [];

      toppingsArray1.forEach(function(topping)
      {
        let line = `${topping.quantity} of ${topping.name}`;
        toppingsStringsArray1.push(line);

      }); 
      const tacoData = {
        protein: proteinIngredient1,
        salsa: salsaIngredient1,
        toppings: toppingsStringsArray1
      };

       results.push(tacoData);
  }

 
  if(clickedChoice === "chicken")
  {
    console.log(results[0]);
    return results[0];
  }
  else if(clickedChoice === "beef")
  {
    console.log(results[1]);
    return results[1];
  }
  else if(clickedChoice === "fish")
  {
    console.log(results[2]);
    return results[2];
  }


      
}

app.post("/recipe", (req, res) => {
    const data = getJSONData(req.body.choice);
    res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
