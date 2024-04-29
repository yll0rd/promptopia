"use client";

import {ChangeEvent, useEffect, useState} from "react";
import PromptCard from "@/components/PromptCard";
import {PromptType} from "@/models/prompt";

const PromptCardList = ({data, handleTagClick} : { data: PromptType[], handleTagClick: (value?: any) => void }) => {
    console.log(data)
    return (
        <div className="mt-16 prompt_layout">
            {data.map((d) => {
                return (
                    <PromptCard
                        key={d._id}
                        post={d}
                        handleTagClick={handleTagClick}
                    />
                )
            })}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<PromptType[]>([])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {}

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
            type='text'
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
        />
      </form>
        <PromptCardList
            data={posts}
            handleTagClick={() => {}}
        />
    </section>
  )
}

export default Feed