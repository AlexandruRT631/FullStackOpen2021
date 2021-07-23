import React from 'react'

const Header = (props) => {
    return (
        <div>
            <p>
                {props.course}
            </p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {

    const parts = props.parts

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Total = (props) => {

    const total = props.parts.reduce((sum,index) => sum = sum + index.exercises, 0)

    return (
        <div>
            <p>
                <b>total of {total} exercises</b>
            </p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <h2><Header course={props.course.name}/></h2>
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
        </div>
    )
}

export default Course