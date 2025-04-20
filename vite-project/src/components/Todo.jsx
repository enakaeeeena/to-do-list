import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "../store/todoSlice";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const dateInputRef = useRef(null);
  
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text && deadline) {
      dispatch(addTodo({ text, deadline }));
      setText("");
      setDeadline("");
    }
  };

  const handleCalendarClick = () => {
    dateInputRef.current.showPicker();
  };

  const getDeadlineColor = (deadlineDate) => {
    const now = new Date();
    const deadline = parseISO(deadlineDate);
    
    if (isBefore(deadline, now)) return '#d81b60';
    if (isToday(deadline) || isTomorrow(deadline)) return '#ba68c8';
    return '#7e57c2';
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const groupedTodos = filteredTodos.reduce((acc, todo) => {
    const dateKey = format(parseISO(todo.deadline), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f9f0ff'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(106, 13, 173, 0.1)',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          color: '#6a0dad'
        }}>
          ToDo List
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '25px',
          padding: '15px',
          backgroundColor: '#f3e5ff',
          borderRadius: '6px',
          border: '1px solid #e6d0ff',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Что нужно сделать?"
              style={{ 
                flex: '1 1 200px',
                minWidth: '150px',
                padding: '10px',
                border: '2px solid #ba68c8',
                borderRadius: '6px',
                backgroundColor: '#faf5ff',
                color: '#4a148c',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            
            <div style={{ 
              position: 'relative',
              flex: '0 0 180px',
              minWidth: '180px',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              <input
                type="datetime-local"
                ref={dateInputRef}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  border: '2px solid #ba68c8',
                  borderRadius: '6px',
                  backgroundColor: '#faf5ff',
                  color: '#4a148c',
                  fontSize: '16px',
                  opacity: 0,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              />
              <div
                onClick={handleCalendarClick}
                style={{
                  width: '100%',
                  padding: '10px 35px 10px 15px',
                  border: '2px solid #ba68c8',
                  borderRadius: '6px',
                  backgroundColor: '#faf5ff',
                  color: deadline ? '#4a148c' : '#aaa',
                  fontSize: '14px',
                  position: 'relative',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxSizing: 'border-box'
                }}
              >
                {deadline ? format(new Date(deadline), 'dd.MM.yy HH:mm') : 'Выберите дату'}
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#9c27b0',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <button 
              onClick={handleAddTodo}
              style={{
                padding: '10px 20px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                flex: '1 1 auto',
                minWidth: '150px'
              }}
            >
              Добавить задачу
            </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              flex: '1 1 auto',
              minWidth: '200px'
            }}>
              <span style={{ fontWeight: '500', color: '#6a0dad' }}>Фильтр:</span>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{ 
                  padding: '10px',
                  border: '2px solid #ba68c8',
                  borderRadius: '6px',
                  backgroundColor: '#faf5ff',
                  color: '#4a148c',
                  fontSize: '16px',
                  flex: '1',
                  boxSizing: 'border-box'
                }}
              >
                <option value="all">Все</option>
                <option value="active">Активные</option>
                <option value="completed">Завершенные</option>
              </select>
            </div>
          </div>
        </div>

        {Object.entries(groupedTodos).map(([date, todosForDate]) => (
          <div key={date} style={{ marginBottom: '25px' }}>
            <h3 style={{
              padding: '8px 12px',
              backgroundColor: '#e1bee7',
              color: '#4a148c',
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              {format(parseISO(date), 'EEEE, d MMMM yyyy')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {todosForDate.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    margin: '8px 0',
                    border: '1px solid #e6d0ff',
                    borderRadius: '4px',
                    backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleComplete(todo.id))}
                    style={{ 
                      marginRight: '12px',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#9c27b0'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#6c757d' : '#212529'
                    }}>
                      {todo.text}
                    </span>
                    <div style={{ fontSize: '0.85em', marginTop: '6px' }}>
                      {!todo.completed ? (
                        <span style={{ 
                          color: getDeadlineColor(todo.deadline),
                          fontWeight: '500'
                        }}>
                          Дедлайн: {format(parseISO(todo.deadline), 'd MMM yyyy, HH:mm')}
                        </span>
                      ) : (
                        <span style={{ color: '#6c757d' }}>
                          Завершено: {format(parseISO(todo.completedAt), 'd MMM yyyy, HH:mm')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    style={{ 
                      marginLeft: '10px',
                      backgroundColor: '#ab47bc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '0.85em'
                    }}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;