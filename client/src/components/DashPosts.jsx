import { Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-2/3 mx-auto h-grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {userPosts.map((post) => (
        <div key={post._id} className='bg-white dark:bg-gray-800 rounded shadow-md w-2/3 overflow-hidden mx-auto mt-5'>
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image}
              alt={post.title}
              className='w-full h-96 object-cover'
            />
          </Link>
          <div className='p-4'>
            <Link
              className='block text-lg font-semibold text-gray-900 dark:text-white hover:underline'
              to={`/post/${post.slug}`}
            >
              {post.title}
            </Link>
            <p className='text-sm text-gray-500'>{new Date(post.updatedAt).toLocaleDateString()}</p>
            <div className='flex justify-between mt-2'>
              <span
                onClick={() => {
                  setShowModal(true);
                  setPostIdToDelete(post._id);
                }}
                className='text-sm font-medium text-red-500 hover:underline cursor-pointer'
              >
                Delete
              </span>
              <Link
                className='text-sm text-teal-500 hover:underline'
                to={`/update-post/${post._id}`}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
      {showMore && (
        <button
          onClick={handleShowMore}
          className='col-span-full text-center text-teal-500 hover:underline'
        >
          Show more
        </button>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
