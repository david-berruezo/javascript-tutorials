const doSomething = (cb) => {
    const error = new Error('Something');
    // lanzamos error
    // cb(error,null);
    // lanzamos acierto
    let result = {"success":"ok"};
    cb(null,result);
};

doSomething((error,result) => {
    if (error){
        console.log('There was an error');
        return;
    }
    console.log(result);
    console.log('Everything went well');
});