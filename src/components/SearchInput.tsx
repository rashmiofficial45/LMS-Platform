import { Search } from "lucide-react";
import Form from "next/form";

// Note:Using Server Component Output: search?term={searchQuery}
const SearchInput = () => {

  return (
    <Form action={"/search"}
      className="relative flex-1 w-full max-w-[300px] items-center"
    >
      <input
        type="text"
        name="term"
        placeholder="Search..."
        className="border w-full rounded-full bg-secondary/80 sm:pl-10 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        aria-label="Search input"
      />
      <Search className="hidden sm:block w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
    </Form>
  );
};

export default SearchInput;



// Note:Using Client Component Output: search/{searchQuery}
// "use client"
// import { Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// type Props = {};

// const SearchInput = (props: Props) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSearchSubmit}
//       className="relative flex-1 w-full max-w-[300px] items-center"
//     >
//       <input
//         onChange={(e) => setSearchQuery(e.target.value)}
//         type="text"
//         value={searchQuery}
//         placeholder="Search..."
//         className="border w-full rounded-full bg-secondary/80 sm:pl-10 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//         aria-label="Search input"
//       />
//       <Search className="hidden sm:block w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
//     </form>
//   );
// };

// export default SearchInput;
