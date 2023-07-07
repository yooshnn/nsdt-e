window.addEventListener('APPLY_TEMPLATE', (event) => {
  console.log(event.detail);

  const config = JSON.parse(event.detail.config);
  const query = JSON.parse(event.detail.query);

  json_query = query;
  config_json = { ...config_json, ...config };

  update_from_json(config_json, json_query);

  console.log('done.');
});
