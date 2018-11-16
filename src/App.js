import { TaskTemplate,TaskToolbar, ToolButtonList } from 'graphlabs.core.template';
import {GraphLoader} from "./GraphLoader";
import { CommonGraphAdapter } from "graphlabs.core.template"
import {IGraph, IVertex, IEdge, IsomorphismChecker} from "graphlabs.core.graphs";
import {actionsCreators} from "graphlabs.core.template";
import {store} from "graphlabs.core.template";
import * as React from 'react';
import { Adapter2 } from "./Adapter2";
import { TaskConsole } from "graphlabs.core.template";
import { StudentMark } from "graphlabs.core.template";
import {default as styled, StyledFunction } from 'styled-components';
import {Component, HTMLProps, SFC} from 'react';

interface Idiv {
    id: string;
}
const div: StyledFunction<Idiv & HTMLProps<HTMLDivElement> >= styled.div;


export class App extends TaskTemplate {

    isomorphism;
    answer;
    graph1;
    graph2;
    storeVertices;

    componentWillMount() {
        var obj = GraphLoader.parseFromStr();
        const graph1: IGraph<IVertex, IEdge> = GraphLoader.createGraph(obj , 0);
        graph1.vertices.forEach(v => this.dispatch(actionsCreators.addVertex(v.name)));
        graph1.edges.forEach(e => this.dispatch(actionsCreators.addEdge(e.vertexOne.name, e.vertexTwo.name)));

        const graph2: IGraph<IVertex, IEdge> = GraphLoader.createGraph(obj , 1);
        graph2.vertices.forEach(v => this.dispatch(actionsCreators.addVertex(v.name)));
        graph2.edges.forEach(e => this.dispatch(actionsCreators.addEdge(e.vertexOne.name, e.vertexTwo.name)));

        this.graph1=graph1;
        this.graph2=graph2;
        //this.setIsomorphism(GraphLoader.checkIsomorphism(graph1,graph2));

    }


    constructor(props: {}) {
        super(props);
        this.calculate = this.calculate.bind(this);
    }

    setIsomorphism(res){
        this.isomorphism = res;
    }

    getIsomorphism(){
        return this.isomorphism;
    }

    calculate() {
        if (this.getIsomorphism() == true & this.getAnswer() == "yes" || this.getIsomorphism() == false & this.getAnswer() == "no") return  true
        else return false;
    }

    setYes()
    {
        this.answer = "yes";
        alert(this.storeVertices);
    }

    setNo()
    {
        this.answer = "no";
        alert("Эти пары: " + this.storeVertices);
    }

    getAnswer(){
        return this.answer;
    }


    getTaskToolbar() {
        TaskToolbar.prototype.getButtonList = () => {
            // function beforeComplete():  Promise<{ success: boolean}> {
            //     return new Promise((resolve => {
            //         resolve(this.calculate());
            //     }));
            // }
            // ToolButtonList.prototype.beforeComplete = beforeComplete.bind(this);
            ToolButtonList.prototype.help = () => `В данном задании Вы должны определить, являются ли
данные два графа изоморфными. 
При выборе ответа необходимо указать причину.
После выбора ответа нажмите кнопку отправки для проверки задания.`;
            return ToolButtonList;
        };
        return TaskToolbar;
    }

    task() {

        return () => (

                 <form>
                     <p><strong>Являются ли графы изоморфными?</strong></p>
                     <p><input type="radio" name="answer" value="yes" onClick={this.setYes.bind(this)}/> Да</p>
                     <p><input type="radio" name="answer" value="no" onClick={this.setNo.bind(this)} /> Нет</p>
                     <p> Почему?</p>
                     <p><textarea maxLength="120" cols="30" rows="3"/></p>

                 </form>
        );


    }


    render() {
        var Task = this.task();
        const Toolbar = this.getTaskToolbar();
        return (
            <App2 id="wrap">
                {this.state.status
                    ? <p>Задание выполнено. Ожидайте ответа от сервера...</p>
                    : (
                        <div>
                            <MainRow>
                                <GraphCell>
                                    <Adapter2/>
                                </GraphCell>
                                <TaskCell>
                                    <p>Задание</p>
                                    <Task/>
                                </TaskCell>
                                <ToolCell>
                                    <Toolbar/>
                                </ToolCell>
                            </MainRow>
                            <LeftBottom>
                                <StudentMark/>
                            </LeftBottom>
                            <LowRow>
                                <TaskConsole/>
                            </LowRow>
                        </div>)}
            </App2>
        )
    }

}
export default App;

const BorderedDiv = styled.div` 
{ 
box-shadow:2px 2px 11px rgba(0, 0, 0, 0.5); 
-webkit-box-shadow:2px 2px 11px rgba(0, 0, 0, 0.5); 
border-radius: 10px; 
background: #fffaf0; 
} 
`;

const GraphCell = BorderedDiv.extend` 
{ 
position: fixed; 
left: 15%; 
top: 1%; 
width: 62%; 
height: 78%; 
} 
`;

const ToolCell = BorderedDiv.extend` 
{ 
position: fixed; 
left: 1%; 
top: 1%; 
width: 12%; 
height: 78%; 
} 
`;

const TaskCell = BorderedDiv.extend` 
{ 
position: fixed; 
left: 79%; 
top: 1%; 
width: 20%; 
height: 78%; 
} 
`;

const LeftBottom = BorderedDiv.extend` 
{ 
position: fixed; 
left: 1%; 
top: 80%; 
width: 12%; 
height: 19%; 
} 
`;

const LowRow = BorderedDiv.extend` 
{ 
position: fixed; 
left: 15%; 
top: 80%; 
width: 84%; 
height: 19%; 
} 
`;

const App2 = div` 
{ 
position: fixed; 
left: 0; 
top: 0; 
width: 100%; 
height: 100%; 
} 
`;

const MainRow = styled.div` 
{ 
position: fixed; 
left: 0; 
top: 0; 
width: 100%; 
height: 80%; 
} 
`;