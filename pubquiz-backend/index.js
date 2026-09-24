const express= require('express')
const cors = require('cors')
const excelToJson = require('convert-excel-to-json')
const multer = require('multer');
const {MongoClient, ServerApiVersion,ObjectId} = require('mongodb')

const uri = VITE_MONGODB_URI;

const app = express();
app.use(cors())
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const client = new MongoClient(uri,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
     console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//endpointy
async function run(){
    try{
        await client.connect();
        console.log("połączyło z mongodb!!!");

        const database=client.db("pubquiz_db")
        const teams= database.collection("teams")
        const questions = database.collection("questions")
        await listDatabases(client)

        app.listen(3001,()=>{
            console.log('serwer nasluchuje na localhost:3001')
        })

        //testowy
        app.get('/api/test', async (req,res)=> {
          res.json({message: "backend?? its working!!"})
        });
        //pobieranie pytan
        app.get('/host/question', async(req,res)=>{
            try{
                const data = await questions.find({}).toArray();
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({error:"blad pobierania z bazki"});
            }

        })
        //dodawanie drużyn
        app.post('/host/teams', async(req,res)=>{
            try{
                const newTeam = req.body;
                const result = await teams.insertOne(newTeam)
                res.status(201).json({message:'dodano druzyne', id: result.insertedId});
            } catch (error){
                res.status(500).json({error:"blad zapisu do baaski"});
            }
        })
        //dodawanie punktow
        app.put("/host/teams", async(req,res)=>{
            try{
                const updatedTeam = req.body;
                const {_id, ...fieldsToUpdate} = updatedTeam;
                const filter = _id? {_id: new ObjectId(_id)}: {name:fieldsToUpdate.name};

                const result = await teams.updateOne(filter, {$set: fieldsToUpdate});
                if (result.matchedCount === 0){
                    return res.status(404).json({error:"nie ma druzyny do updateu"})
                }
                res.status(200).json({message:"zupdatetowane"})
            } catch (error){
                console.error("blad updateu", error);
                res.status(500).json({error: "blad serwera podczas aktulizacji"});
            }
        });
        //wyniki
        app.get("/host/questions", async(req,res)=>{
            try{
                const data = await teams.find({}).toArray();
                res.status(200).json(data);
            } catch (error){
                res.status(500).json({error:"blad pobierania"});
            }
        });
        //pobieranie excel to json

        app.post("/host/questions", upload.single("file"), async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).json({ error: "Nie przesłano pliku" });
                }
                const newQuestions = excelToJson({
                    source: req.file.buffer,
                    header: { rows: 1 },
                    columnToKey: {
                        A: "category",
                        B: "question",
                        C: "answer_A",
                        D: "answer_B",
                        E: "answer_C",
                        F: "answer_D",
                        G: "right_answer",
                        H: "source_photo_link",
                    }
                });
                const sheetName = Object.keys(newQuestions)[0];
                const questionsArray = newQuestions[sheetName];
                const result = await questions.insertMany(questionsArray);
                res.status(201).json({ message: 'dodano pytania', count: result.insertedCount });

            } catch (error) {
                console.error("Błąd parsowania excela: ", error);
                res.status(500).json({ error: "blad zapisu do baaski" });
            }
        });

    } catch (error){
        console.error("blad polaczenia", error);
    }
}
run().catch(console.dir);

