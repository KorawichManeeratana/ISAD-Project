"use client"
export default function Test() {

    async function uploadPic() {
        const file = document.querySelector("input")!;
        const button = document.querySelector(".change");
        const img: HTMLImageElement = document.querySelector('.image')!;
        
        let a = new FormData();
        a.append("rep_name", "กระเพรา")
        a.append("rep_des", "DSADSADADSADAD")
        a.append("pic", file.files![0]);
        a.append("calories", "500")
        a.append("rep_time", "54")
        a.append("rep_date", "2024-09-21 22:45:43");
        a.append("likes", "9999999")
        a.append("rep_step", "DSADSADADSADADaaaaaaaa")
        let req = await fetch("http://localhost:3000/attractions/api_Recipes", {
            method: "POST",
            body: a
        });
        let b = await req.json();
        console.log(b.message);
        img.src = b.message;
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-slate-500 h-3/4 w-1/4 rounded-2xl p-4">
                <div className="flex items-center justify-center h-4/5">
                    <img className="image h-4/5 rounded-xl shadow-2xl" src=""></img>
                </div>

                <div className="flex justify-center items-center h-1/5">
                    <label className="bg-cyan-400 text-black px-16 py-4 rounded-xl shadow-2xl" htmlFor="pic">picture</label>
                    <input className="hidden" type="file" name="pic" id="pic" onChange={uploadPic} />
                </div>
            </div>
        </div>
    )
}