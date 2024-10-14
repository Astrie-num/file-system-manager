const {writeFile, readFile, appendFile, readdir, unlink} = require('fs').promises;

async function fileManager(){
    try{

        const firstFilePath = './content/test.txt';
        const secondFilePath = './content/quiz.txt';
        const firstContent = 'Hello, world!';
        const secondContent = 'Hey, Astrie';
        const appendedContent = '\nThis is an appended line.';
        const directoryPath = './content';


        // Check if file exists before doing any other operations


        async function fileExists(filePath){
            try{
                await readFile(filePath)
                return true;
            }
            catch(err){
                if(err.code === "ENOENT"){
                    return false;
                }
                throw err;
            }
        }

        //Create first file
        await writeFile(firstFilePath, firstContent);
        console.log("First file created successfully!");

        // Create second file
        await writeFile(secondFilePath, secondContent);
        console.log("Second file created successfully!");

        // Read first file 
        if(await fileExists(firstFilePath)){

            const firstResult = await readFile(firstFilePath, 'utf-8');
            console.log(firstResult);
        }
        else{
            console.log("First file does not exist");
        }
        

        // Read second file
        if(await fileExists(secondFilePath)) {

            const secondResult = await readFile(secondFilePath, 'utf-8');
        console.log(secondResult);

        }
        else{
            console.log("Second file does not exist");
        }
        
        
        // Append to first file 
        if(await fileExists(firstFilePath)){
            await appendFile(firstFilePath, appendedContent);
            console.log("File appended successfully!");

            //Read append results
            const updatedFirstResult = await readFile(firstFilePath, 'utf-8');
            console.log("This is the result of appending: ", updatedFirstResult);

        }
        else{
            console.log("Cannot append to a non-existent file");
        }
        
        
        // List all files
        const files = await readdir(directoryPath);
        console.log("All files present: ", files);


        // Delete a file
        if(await fileExists(firstFilePath)){

            await unlink(firstFilePath);
            console.log("File deleted successfully!");
        }
        else{
            console.log("Cannot delete a non-existent file");
        }
        


        // List files again
        const filesRemaining = await readdir(directoryPath);
        console.log("Files present after deleting: ", filesRemaining);

    }
    catch(err){
        console.error(err);
    }
}

fileManager();