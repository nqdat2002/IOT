import { Router } from "express";

const router = Router();

let fakeDatabase = [
    {id: 1, title: "hi", des:"hi nay"},
    {id: 2, title: "rua bat", des: "rua bat nay"},
];

router.get("/todo", (req, res) => {
    return res.json({
        statusCode: 200,
        data: fakeDatabase,
        message: "success"
    });
});

router.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const data = fakeDatabase.filter((value) => value.id === +id);

    if(!id){
        return res.json(
        {
            statusCode:404,
            message: "not found"
        });
    }
    
    return res.json(
    {
        statusCode:200,
        data:data,
        message:"success"
    });
})


router.post("/todo", (req, res) =>{
    const dataFromClient = req.body;
    fakeDatabase.push(dataFromClient);
    return res.json({
        statusCode:200,
        data: fakeDatabase
    });
});

router.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const newDatabase = fakeDatabase.map((value) =>{
        return {...value};
    });
    return res.json(
    {
        statusCode:200,
        data: newDatabase
    }
    );
});

router.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    const dataFromClient = req.body;
    const newDatabase = fakeDatabase.map((value) =>{
        if (value.id == id){
            return {...value, ...dataFromClient};
        }
        return value;
    });
    return res.json(
    {
        statusCode:200,
        data: newDatabase
    }
    );
});


router.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    fakeDatabase = fakeDatabase.filter((value) => value.id != id);    
    return res.json(
    {
        statusCode:200,
        data: fakeDatabase
    }
    );
});


export default router;