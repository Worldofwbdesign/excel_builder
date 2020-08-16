export const createHeader = ($root, state) => 
`
  <input id="headerInput" value="${state.title}" type="text" class="input" value="New Table" />
  <div class="btnsWrapp">
    <div class="button">
      <i class="material-icons">
        exit_to_app
      </i>
    </div>
    <div class="button">
      <i class="material-icons">
        delete
      </i>
    </div>
  </div>
`