const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const hewan = [
  { id: 1, nama: "Snowy", spesies: "kucing" },
  { id: 2, nama: "Blacki", spesies: "anjing" },
  { id: 3, nama: "Molly", spesies: "kucing" },
  { id: 4, nama: "Milo", spesies: "kelinci" },
  { id: 5, nama: "Rere", spesies: "kucing" },
];

const middlewareLogger = (req,res,next) =>{
    console.log("middleware berjalan")
    next()
}

const middlewarePostChecker = (req,res,next) =>{
    const species = req.body.spesies

    if( species==="kucing" || species === "anjing" || species === "kelinci"){
        next()
    }else{
        res.status(400)
        res.json({message:"wrong spesies input"})
    }
}

app.use(express.json());
app.use(middlewareLogger)

app.get("/", (req, res) => {
  res.json("this is express routing");
});

app.get("/hewan", (req, res) => {
  res.json(hewan);
});

app.post("/hewan",middlewarePostChecker, (req, res) => {
  const data = req.body;

  hewan.push(data);

  res.json("data berhasil di input");
});

app.get("/hewan/:id", (req, res) => {
  const { id } = req.params;

  const binatang = hewan.find((item) => item.id == id);

  res.json(binatang);
});

app.put("/hewan/:id", (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const binatangIndex = hewan.findIndex((item) => item.id == id);
  const binatang = hewan.find((item) => item.id == id);

  if (binatang) {
    hewan.splice(binatangIndex, 1, updateData);
    
    res.json({
      message: "data updated",
    });
  }
});

app.delete("/hewan/:id", (req, res) => {
  const { id } = req.params;
  const binatang = hewan.find((item) => item.id == id);
  const binatangIndex = hewan.findIndex((item) => item.id == id);

  if (binatang) {
    hewan.splice(binatangIndex, 1);
    res.json({
      message: "sucess delete one pet data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server ini jalan di port ${PORT}`);
});
