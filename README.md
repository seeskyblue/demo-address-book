# demo-address-book

## Usage

```bash
yarn

yarn start
```

or

```bash
npm install

npm start
```

## Sketch

<table>
  <caption>Address Book</caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2"><input type="checkbox" /></th>
      <th scope="col" rowspan="2">ID</th>
      <th scope="col" rowspan="2">Name</th>
      <th scope="col" rowspan="2">Location</th>
      <th scope="col" rowspan="2">Office</th>
      <th scope="colgroup" colspan="2">Phone</th>
    </tr>
    <tr>
      <th scope="col">Office</th>
      <th scope="col">Cell</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><input type="checkbox" /></th>
      <td>501</td>
      <td>Khali Zhang</td>
      <td>Shanghai</td>
      <td>C-103</td>
      <td>x55778</td>
      <td>650-353-1239</td>
    </tr>
    <tr>
      <th scope="row"><input type="checkbox" /></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"><input type="checkbox" /></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"><input type="checkbox" /></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td><button>Delete</button></td>
      <td></td>
      <td></td>
      <td></td>
      <td><button>Update</button></td>
      <td><button>Add</button></td>
    </tr>
  </tfoot>
</table>

## Notes

1.	Cell phone column can be edited when double clicked

2.	Clicking the column labe would sort the column alphabatically

3.	When the selector of the first column and the first row is checked, all rows are selected

4.	Clicking the Delete button will delete the selected rows

5.	Update will cause the Ajax invocation to update the modified rows.  For now just pop up a alert panel showing the rows you are to update

6.	Add will add an empty row to fill in the data except the ID, which will be filled after updating

7.	Think of how to localize this