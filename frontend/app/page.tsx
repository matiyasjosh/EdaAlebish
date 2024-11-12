import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-around mt-36">
        <div className="w-[35%] text-xl my-auto">
          <p>
            It is a website that tracks a debt that each friends has on each
            other after they eat lunch or dinner together. It is created due to
            the fact that some friends are forgetting that they have debts on
            each other.
          </p>
        </div>

        <Image
          src={"/images/edalebish.jpeg"}
          alt={"yazew"}
          width={450}
          height={450}
        />
      </div>


      <div className="bg-[#00078F] opacity-25 w-full h-[300px] lg:mt-80 flex justify-around pt-20">
        <Image
          src={"/images/checklist.jpeg"}
          alt="yazew"
          width={300}
          height={10}
          className="rounded-full w-[200px] h-[200px]"
        />
        <p className="text-white text-2xl w-[30%]">
          You create a group with your friends and start tracking the debt you
          have on each other.
        </p>
      </div>

      <div className="flex justify-around lg:mt-80">
        <p className="w-[30%] text-xl my-auto">
          It uses unique type of tables to keep track of the debt you have on
          each other. To get more detail on how to use the table see the about
          page
        </p>

        <Image src={"/images/edaTableNew.png"} alt="lkekew" width={1000} height={700} className="w-[1000px] h-[300px]" />
      </div>
    </div>
  );
}
