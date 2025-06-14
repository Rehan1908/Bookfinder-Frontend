import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';
import Button from '../components/common/Button';
import BookList from '../components/books/BookList';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const { fetchBooks, books } = useContext(BookContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirect to home if not admin
    } else {
      fetchBooks(); // Fetch books if admin
    }
  }, [user, navigate, fetchBooks]);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <Button onClick={() => navigate('/add-book')}>Add New Book</Button>
      <BookList books={books} />
    </div>
  );
};

export default AdminPage;