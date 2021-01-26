<!-- Body -->
<Row>
  
  <Col width="100" xlarge="70">

    <!-- data-table here -->


  </Col>
  <Col width="100" xlarge="30">

    <!-- right section here -->

    <List accordionList>
      <ListItem accordionItem accordionItemOpened title="Summary">
        <AccordionContent></AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Show/Hide fields">
        <AccordionContent></AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Show rows">
        <AccordionContent></AccordionContent>
      </ListItem>
    </List>

  </Col>
</Row>



<script>
  import { onMount } from 'svelte';
  import { AccordionContent,theme, Card, CardHeader, CardContent, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Icon, Page, Navbar, BlockTitle } from 'framework7-svelte';
</script>