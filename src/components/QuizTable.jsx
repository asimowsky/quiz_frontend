import React, { useState } from 'react';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const QuizTable = ({ quizData }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'User Details',
            dataIndex: 'userdetails',
            key: 'userdetails',
            render: (userdetails) => (
                <div>
                    <p>Name: {userdetails.name}</p>
                    <p>Surname: {userdetails.surname}</p>
                    <p>Email: {userdetails.email}</p>
                    <p>Email: {userdetails?.phone}</p>
                </div>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search by Name`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'userdetails')}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <button
                            type="button"
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSearch(selectedKeys, confirm, 'userdetails')}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) =>
                record.userdetails.name.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Questions',
            dataIndex: 'questions',
            key: 'questions',
            render: (questions) => (
                <ul>
                    {questions.map((q) => (
                        <li key={q.question}>
                            {q.question}: {q.answer}
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    return (
        <>

            {/* {quizData?.map((quiz) => (
                    <div key={quiz._id}>
                        <h2>User Details:</h2>
                        <p>Name: {quiz.userdetails.name}</p>
                        <p>Surname: {quiz.userdetails.surname}</p>
                        <p>Email: {quiz.userdetails.email}</p>
                        <h3>Questions:</h3>
                        <ul>
                            {quiz.questions.map((q) => (
                                <li key={q.questionNumber}>
                                    {q.questionNumber}: {q.answer}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))} */}
            <Table
                dataSource={quizData}
                columns={columns}
                pagination={{ pageSize: 4 }}
                rowKey="_id"
                striped
            />
        </>
    );
};

export default QuizTable;
