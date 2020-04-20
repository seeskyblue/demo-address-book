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
      <th scope="col" rowspan="2">[ ]</th>
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
      <th scope="row">[ ]</th>
      <td>501</td>
      <td>Khali Zhang</td>
      <td>Shanghai</td>
      <td>C-103</td>
      <td>x55778</td>
      <td>650-353-1239</td>
    </tr>
    <tr>
      <th scope="row">[ ]</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">[ ]</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">[ ]</th>
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
      <td>[Delete]</td>
      <td></td>
      <td></td>
      <td></td>
      <td>[Update]</td>
      <td>[Add]</td>
    </tr>
  </tfoot>
</table>

## Notes

* [x] Cell phone column can be edited when double clicked

* [x] Clicking the column labe would sort the column alphabatically

* [x] When the selector of the first column and the first row is checked, all rows are selected

* [x] Clicking the Delete button will delete the selected rows

* [x] Update will cause the Ajax invocation to update the modified rows.  For now just pop up a alert panel showing the rows you are to update

* [x] Add will add an empty row to fill in the data except the ID, which will be filled after updating

* [x] Think of how to localize this
