import React, { useState } from 'react'

const Coursestate = () => {
  
    const [lessons,setlessons]=useState([
        {
          name:'',
          slides:[{
            title:'',
            content:''
          },{
            title:'',
            content:''
          },{
            title:'',
            content:''
          },{
            title:'',
            content:''
          },{
            title:'',
            content:''
          }
        ],
        test:[{
            question:'',   answer:'',   options:[{option:''},{option:''},
            {option:''},{option:''},]},
            {
              question:'',   answer:'',   options:[{option:''},{option:''},
              {option:''},{option:''},]},
            {
              question:'',   answer:'',   options:[{option:''},{option:''},
              {option:''},{option:''},]},
            {
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''}]},
            {
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''}]},     
            ]
          },
          {
            name:'',
            slides:[{
              title:'',
              content:''
            },{
              title:'',
              content:''
            },{
              title:'',
              content:''
            },{
              title:'',
              content:''
            },{
              title:'',
              content:''
            }
          ],
          test:[{
            question:'',   answer:'',   options:[{option:''},{option:''},
            {option:''},{option:''},]},
            {
              question:'',   answer:'',   options:[{option:''},{option:''},
              {option:''},{option:''},]},
            {
              question:'',   answer:'',   options:[{option:''},{option:''},
              {option:''},{option:''},]},
            {
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''}]},
            {
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''}]},     
            ]
           
            },    
            {
              name:'',
              slides:[{
                title:'',
                content:''
              },{
                title:'',
                content:''
              },{
                title:'',
                content:''
              },{
                title:'',
                content:''
              },{
                title:'',
                content:''
              }
            ],
            test:[{
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''},]},
                {
                  question:'',   answer:'',   options:[{option:''},{option:''},
                  {option:''},{option:''},]},
                {
                  question:'',   answer:'',   options:[{option:''},{option:''},
                  {option:''},{option:''},]},
                {
                    question:'',   answer:'',   options:[{option:''},{option:''},
                    {option:''},{option:''}]},
                {
                    question:'',   answer:'',   options:[{option:''},{option:''},
                    {option:''},{option:''}]},     
                ]
              },
              {
                name:'',
                slides:[{
                  title:'',
                  content:''
                },{
                  title:'',
                  content:''
                },{
                  title:'',
                  content:''
                },{
                  title:'',
                  content:''
                },{
                  title:'',
                  content:''
                }
              ],
              test:[{
                question:'',   answer:'',   options:[{option:''},{option:''},
                {option:''},{option:''},]},
                {
                  question:'',   answer:'',   options:[{option:''},{option:''},
                  {option:''},{option:''},]},
                {
                  question:'',   answer:'',   options:[{option:''},{option:''},
                  {option:''},{option:''},]},
                {
                    question:'',   answer:'',   options:[{option:''},{option:''},
                    {option:''},{option:''}]},
                {
                    question:'',   answer:'',   options:[{option:''},{option:''},
                    {option:''},{option:''}]},     
                ]
                },
                {
                  name:'',
                  slides:[{
                    title:'',
                    content:''
                  },{
                    title:'',
                    content:''
                  },{
                    title:'',
                    content:''
                  },{
                    title:'',
                    content:''
                  },{
                    title:'',
                    content:''
                  }
                ],
                test:[{
                    question:'',   answer:'',   options:[{option:''},{option:''},
                    {option:''},{option:''},]},
                    {
                      question:'',   answer:'',   options:[{option:''},{option:''},
                      {option:''},{option:''},]},
                    {
                      question:'',   answer:'',   options:[{option:''},{option:''},
                      {option:''},{option:''},]},
                    {
                        question:'',   answer:'',   options:[{option:''},{option:''},
                        {option:''},{option:''}]},
                    {
                        question:'',   answer:'',   options:[{option:''},{option:''},
                        {option:''},{option:''}]},     
                    ]
                  },
    ])

  
   return {lessons,setlessons}
}


export default Coursestate