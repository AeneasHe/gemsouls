
function Home() {


    return (
        <div className="container">

            <div className="flex justify-center ">
                <h3>Gemsouls</h3>
            </div>

            <div className="flex h-3/4   flex-col justify-center">

                <div className="flex  place-content-center text-center m-4" >
                    <div className="bg-blue-400 text-white box-border  p-1 w-max h-min text-center">
                        <a href="/chatroom" > go to chatroom  </a>
                    </div>

                </div>
                <div className="flex  place-content-center text-center m-4" >
                    <div className="bg-blue-400 text-white box-border  p-1 w-max h-min text-center">
                        <a href="/profile" > go to profile  </a>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;
