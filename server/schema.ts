import z from 'zod'

const achievementsSchemas = {
  entries: {
    schema: z.object({
      title: z.string(),
      thoughts: z.string(),
      difficulty: z.enum(['easy', 'medium', 'hard', 'impossible']),
      created: z.string(),
      updated: z.string()
    }),
    raw: {
      id: 'yqajgwlhsd8so4p',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'achievements__entries',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'ixmmysb1',
          max: 0,
          min: 0,
          name: 'title',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'cy2emstv',
          max: 0,
          min: 0,
          name: 'thoughts',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'auhot6r4',
          maxSelect: 1,
          name: 'difficulty',
          presentable: false,
          required: true,
          system: false,
          type: 'select',
          values: ['easy', 'medium', 'hard', 'impossible']
        },
        {
          hidden: false,
          id: 'autodate2990389176',
          name: 'created',
          onCreate: true,
          onUpdate: false,
          presentable: false,
          system: false,
          type: 'autodate'
        },
        {
          hidden: false,
          id: 'autodate3332085495',
          name: 'updated',
          onCreate: true,
          onUpdate: true,
          presentable: false,
          system: false,
          type: 'autodate'
        }
      ],
      indexes: [],
      system: false
    }
  }
}

export default achievementsSchemas
