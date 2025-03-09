import { db } from "@/firebaseConfig";
import { addDoc, collection, query, orderBy, limit, startAfter, getDocs, Timestamp } from "firebase/firestore";

type Post = {
    caption: string;
    image: string;
    createdAt: Date;
    createdBy: string;
};

const postsCollection = collection(db, "posts");


export async function addPost(post: Post) {
    return await addDoc(postsCollection, {
        ...post,
        createdAt: Timestamp.fromDate(post.createdAt),
    });
}

export async function fetchPosts(lastPost = null, pageSize = 5) {
    let postQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(pageSize));

    if (lastPost) {
        postQuery = query(postsCollection, orderBy("createdAt", "desc"), startAfter(lastPost), limit(pageSize));
    }

    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
        posts,
        lastPost: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null,
    };
}

export default {
    addPost,
    fetchPosts,
};
