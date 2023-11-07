# Modulo Three

#### Implement a modulo-three function that will compute the remainder when the represented value is divided by three. 

## Problem

Build an FSM that takes the input characters, one at a time, MOST significant bit first and transitions between a set of states as specified by the following state transition diagram:

![image](https://github.com/cydn95/mod-three/assets/80715669/6c27ed61-0e81-4383-af71-060c3a32b4a7)

The value that is returned from our function will depend on the state which is selected after the character sequence has been exhausted. The final state will be converted to a remainder value as specified in the following table:

<table>
    <thead>
        <th>Final State</th>
        <th>Output</th>
    </thead>
    <tbody>
        <tr>
            <td><strong>S0</strong></td>
            <td>0</td>
        </tr>
        <tr>
            <td><strong>S1</strong></td>
            <td>1</td>
        </tr>
        <tr>
            <td><strong>S2</strong></td>
            <td>2</td>
        </tr>
    </tbody>
</table>

## Task

With the help of the abstract definition below, create a software module for generating an FSM. The API of your library should be designed for use by other developers. Implement the ‘mod-three’ procedure as an example.

### Finite Automation
```
A finite automaton (FA) is a 5-tuple (Q,Σ,q0,F,δ) where,
Q is a finite set of states
Σ is a finite input alphabet
q0 ∈ Q is the initial state;
F ⊆ Q is the set of accepting/final states;
δ:Q×Σ→Q is the transition function.
```

For any element q of Q and any symbol σ∈Σ, we interpret δ(q,σ) as the state to which the FA moves, if it is in state q and receives the input σ.

### Mod-Three FA
Based on the notation from the definition, our modulo three FSM would be configured as follows:

```
Q = (S0, S1, S2)
Σ = (0, 1)
q0 = S0
F = (S0, S1, S2)
δ(S0,0) = S0; δ(S0,1) = S1; δ(S1,0) = S2; δ(S1,1) = S0; δ(S2,0) = S1; δ(S2,1) = S2
```

## Setup

To set up the app for local development:

```
git clone https://github.com/cydn95/mod-three.git
cd mod-three
```

Install npm modules

```
npm install
```

## Test

```
npm run test:unit # run all tests
npm run test:watch # run all tests in watch mode
npm run test  # check link and run all tests
```

## Run

```
npm run start # build & run dist/index.js
```
