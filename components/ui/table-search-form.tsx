"use client"

import React, { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronDown, ChevronUp, Search, RotateCcw } from "lucide-react"
import type { ProColumnDef } from "@/app/admin/users/columns"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// 搜索字段类型定义
export interface SearchField {
  key: string
  label: string
  type: 'input' | 'select' | 'textarea' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'range' | 'checkbox' | 'radio' | 'file'
  placeholder?: string
  options?: { label: string; value: string }[]
  required?: boolean
  validation?: z.ZodType<any>
  colSize?: number // 栅格占用大小，默认为1
  hideInSearch?: boolean // 是否在搜索中隐藏
  valueEnum?: Record<string, { text: string; status?: string }> // 枚举值
  order?: number // 排序权重
  min?: number | string // 最小值（用于number、date等类型）
  max?: number | string // 最大值（用于number、date等类型）
  step?: number | string // 步长（用于number、range等类型）
  multiple?: boolean // 是否多选（用于select、file等类型）
  accept?: string // 接受的文件类型（用于file类型）
  rows?: number // 行数（用于textarea类型）
  disabled?: boolean // 是否禁用
  readOnly?: boolean // 是否只读
}

// ProTable风格的列配置
export interface ProColumnType<T = any> {
  id?: string
  title?: string
  header?: string | ((props: any) => React.ReactNode)
  dataIndex?: string
  key?: string
  accessorKey?: string
  hideInSearch?: boolean
  valueType?: 'text' | 'select' | 'date' | 'dateRange' | 'textarea' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'range' | 'checkbox' | 'radio' | 'file'
  valueEnum?: Record<string, { text: string; status?: string }>
  fieldProps?: Record<string, any>
  search?: boolean | { transform?: (value: any) => any }
  order?: number
  colSize?: number
}

// 提交按钮所在 col 的 props - 24栅格系统
export interface ColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | { span?: number; offset?: number }
  sm?: number | { span?: number; offset?: number }
  md?: number | { span?: number; offset?: number }
  lg?: number | { span?: number; offset?: number }
  xl?: number | { span?: number; offset?: number }
  xxl?: number | { span?: number; offset?: number }
}

// 默认栅格配置 - 参考 Ant Design ProTable
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
}

// 组件属性接口
interface TableSearchFormProps {
  fields?: SearchField[]
  columns?: ProColumnType[] | ProColumnDef<any>[]
  onSearch: (values: Record<string, any>) => void
  onReset?: () => void
  // ProTable QueryFilter 标准属性
  collapsed?: boolean // 是否折叠超出的表单项，用于受控模式
  defaultCollapsed?: boolean // 默认状态下是否折叠超出的表单项
  onCollapse?: (collapsed: boolean) => void // 切换表单折叠状态时的回调
  hideRequiredMark?: boolean // 隐藏所有表单项的必选标记，默认隐藏
  submitterColSpanProps?: ColProps // 提交按钮所在 col 的 props
  defaultColsNumber?: number // 自定义折叠状态下默认显示的表单控件数量
  labelWidth?: number | 'auto' // label 宽度
  span?: number // 表单项宽度 [0-24]
  split?: boolean // 每一行是否有分割线
  preserve?: boolean // 是否能够查询收起的数据
  // 其他属性
  className?: string
  loading?: boolean
  layout?: 'horizontal' | 'vertical' // 布局方向
}

export default function TableSearchForm({
  fields,
  columns,
  onSearch,
  onReset,
  collapsed: controlledCollapsed,
  defaultCollapsed = true,
  onCollapse,
  hideRequiredMark = true,
  submitterColSpanProps,
  defaultColsNumber,
  labelWidth = 80,
  span,
  split = false,
  preserve = true,
  className,
  loading = false,
  layout = 'horizontal',
}: TableSearchFormProps) {
  // 使用受控或非受控模式
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed
  const [containerWidth, setContainerWidth] = useState(1200)
  

  
  // 先定义布局计算函数，稍后定义actualDefaultColsNumber

  // 从columns生成searchFields
  const generateSearchFieldsFromColumns = (columns: ProColumnType[] | ProColumnDef<any>[]): SearchField[] => {
    return columns
      .filter(col => {
        // 过滤掉不需要搜索的列
        if (col.hideInSearch === true) return false
        // ProColumnType 有 search 属性，ProColumnDef 没有
        if ('search' in col && col.search === false) return false
        if (col.id === 'select' || col.id === 'actions') return false
        if (col.valueType === 'option') return false
        // ProColumnType 有 accessorKey，ProColumnDef 没有
        const hasKey = ('accessorKey' in col && col.accessorKey) || col.dataIndex
        return hasKey
      })
      .map(col => {
        // 安全地获取 key
        const key = ('accessorKey' in col ? col.accessorKey : undefined) || col.dataIndex || ('key' in col ? col.key : undefined) || ''
        const label = typeof col.title === 'string' ? col.title : (typeof col.header === 'string' ? col.header : key)
        // 处理 valueType 转换，将 ProColumnDef 的类型转换为 ProColumnType 支持的类型
        const valueType = col.valueType === 'dateTime' ? 'date' : col.valueType || 'text'
        
        // 根据 valueType 映射到对应的输入类型
        const getFieldType = (): SearchField['type'] => {
          if (col.valueEnum) return 'select';
          
          switch (valueType) {
            case 'text': return 'input';
            case 'select': return 'select';
            case 'date': return 'date';
            case 'dateRange': return 'date'; // 日期范围暂时用单个日期输入
            case 'textarea': return 'textarea';
            case 'number': return 'number';
            case 'password': return 'password';
            case 'email': return 'email';
            case 'tel': return 'tel';
            case 'url': return 'url';
            case 'search': return 'search';
            case 'datetime-local': return 'datetime-local';
            case 'time': return 'time';
            case 'month': return 'month';
            case 'week': return 'week';
            case 'color': return 'color';
            case 'range': return 'range';
            case 'checkbox': return 'checkbox';
            case 'radio': return 'radio';
            case 'file': return 'file';
            default: return 'input';
          }
        };

        return {
          key,
          label,
          type: getFieldType(),
          options: col.valueEnum ? Object.entries(col.valueEnum).map(([value, config]) => ({
            label: config.text,
            value
          })) : undefined,
          colSize: ('colSize' in col ? col.colSize : undefined) || 1,
          order: col.order || 0,
          // 从 fieldProps 中提取额外属性
          ...(col.fieldProps && {
            min: col.fieldProps.min,
            max: col.fieldProps.max,
            step: col.fieldProps.step,
            multiple: col.fieldProps.multiple,
            accept: col.fieldProps.accept,
            rows: col.fieldProps.rows,
            disabled: col.fieldProps.disabled,
            readOnly: col.fieldProps.readOnly,
            placeholder: col.fieldProps.placeholder,
          }),
        } as SearchField
      })
      .sort((a, b) => (b.order || 0) - (a.order || 0))
  }

  // 获取最终的搜索字段
  const searchFields = fields || (columns ? generateSearchFieldsFromColumns(columns) : [])

  // 动态生成表单schema
  const createFormSchema = () => {
    const schemaObject: Record<string, z.ZodType<any>> = {}
    searchFields.forEach(field => {
      if (field.validation) {
        schemaObject[field.key] = field.validation
      } else {
        schemaObject[field.key] = field.required 
          ? z.string().min(1, `${field.label}不能为空`)
          : z.string().optional()
      }
    })
    return z.object(schemaObject)
  }

  const FormSchema = createFormSchema()
  type FormData = z.infer<typeof FormSchema>

  // 初始化默认值
  const getDefaultValues = (): Partial<FormData> => {
    const defaults: Record<string, any> = {}
    searchFields.forEach(field => {
      defaults[field.key] = ""
    })
    return defaults
  }

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  })

  // ProTable QueryFilter 标准响应式布局计算 - 24栅格系统
  const getColSpan = () => {
    if (layout === 'vertical') {
      // 强制上下布局时的规则 - 每个字段占满一行
      return 24
    } else {
      // 默认布局时的规则 - 根据容器宽度动态分配
      if (containerWidth >= 1352) return 6  // 4列布局，每列6格
      if (containerWidth >= 1062) return 8  // 3列布局，每列8格
      if (containerWidth >= 702 && containerWidth < 1062) return 8  // 3列布局
      if (containerWidth <= 701) {
        // 在这个范围内自动切换为垂直布局
        return 24  // 单列布局，占满一行
      }
      return 24 // 兜底情况
    }
  }

  // 计算每行可容纳的字段数量
  const getFieldsPerRow = () => {
    const colSpan = getColSpan()
    return Math.floor(24 / colSpan)
  }

  // ProTable QueryFilter 标准响应式布局计算 - 根据每行字段数动态调整，为操作列预留空间
  const getActualDefaultColsNumber = () => {
    // 如果有传入defaultColsNumber，优先使用（减1为操作列预留空间）
    if (defaultColsNumber) return defaultColsNumber - 1
    
    // 根据响应式布局动态计算每行显示的字段数量
    const fieldsPerRow = getFieldsPerRow()
    // 为操作列预留空间，所以减1
    return Math.max(1, fieldsPerRow - 1)
  }
  
  const actualDefaultColsNumber = getActualDefaultColsNumber()

  // 计算操作列的偏移量 - 实现右对齐
  const getActionOffset = () => {
    const fieldsPerRow = getFieldsPerRow()
    const colSpan = getColSpan()
    const visibleFields = collapsed ? Math.min(actualDefaultColsNumber, searchFields.length) : searchFields.length
    
    if (actualLayout === 'vertical') {
      return 0 // 垂直布局不需要偏移
    }
    
    // 计算当前行已占用的字段数
    const fieldsInCurrentRow = visibleFields % fieldsPerRow || fieldsPerRow
    const usedSpan = fieldsInCurrentRow * colSpan
    const actionSpan = colSpan // 操作列占用一个字段的宽度
    
    // 如果当前行还有空间，计算偏移量使操作列右对齐
    if (usedSpan + actionSpan <= 24) {
      return 24 - usedSpan - actionSpan
    }
    
    // 如果当前行没有空间，操作列换行并右对齐
    return 24 - actionSpan
  }

  // 根据容器宽度自动切换布局
  const actualLayout = layout === 'horizontal' && containerWidth <= 701 ? 'vertical' : layout

  // 获取栅格配置
  const colSpan = getColSpan()
  const fieldsPerRow = getFieldsPerRow()

  const visibleFieldsCount = collapsed ? Math.min(actualDefaultColsNumber, searchFields.length) : searchFields.length
  const hasMoreFields = searchFields.length > actualDefaultColsNumber

  // 监听容器宽度变化
  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.search-form-container')
      if (container) {
        setContainerWidth(container.clientWidth)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = (data: FormData) => {
    // 过滤空值
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value && value.toString().trim() !== '') {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>)
    
    onSearch(filteredData)
  }

  const handleReset = () => {
    form.reset(getDefaultValues())
    onReset?.()
  }

  const renderField = (field: SearchField, index: number) => {
    return (
      <FormField
        control={form.control}
        name={field.key as keyof FormData}
        render={({ field: formField }) => (
          <FormItem className={cn(
            actualLayout === 'vertical' 
              ? 'flex flex-col space-y-1.5' 
              : 'flex items-center'
          )}>
            <FormLabel 
              className={cn(
                'text-sm font-medium text-gray-700',
                actualLayout === 'vertical' 
                  ? 'block mb-1 text-left' 
                  : 'flex-shrink-0 flex items-center justify-end',
                actualLayout === 'horizontal' && labelWidth === 'auto' && 'w-auto'
              )}
              style={{
                ...(actualLayout === 'horizontal' && typeof labelWidth === 'number' && {
                  width: `${labelWidth}px`
                })
              }}
            >
              {field.label}：
              {!hideRequiredMark && field.required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl className={cn(
              actualLayout === 'vertical' ? 'w-full' : 'flex-1'
            )}>
              {(() => {
                const commonProps = {
                  ...formField,
                  placeholder: field.placeholder || (field.type === 'select' ? `请选择${field.label}` : `请输入${field.label}`),
                  disabled: field.disabled,
                  readOnly: field.readOnly,
                };

                switch (field.type) {
                  case 'select':
                    return (
                      <Select
                        value={formField.value as string}
                        onValueChange={formField.onChange}
                        disabled={field.disabled}
                      >
                        <SelectTrigger className={cn(
                          "w-full text-sm",
                          actualLayout === 'vertical' ? 'h-10' : 'h-9'
                        )}>
                          <SelectValue placeholder={field.placeholder || `请选择${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case 'textarea':
                    return (
                      <Textarea
                        {...commonProps}
                        rows={field.rows || 3}
                        className={cn(
                          "w-full text-sm resize-none",
                          actualLayout === 'vertical' ? 'min-h-[90px]' : 'min-h-[80px]'
                        )}
                      />
                    );

                  case 'checkbox':
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={field.key}
                          checked={formField.value as boolean}
                          onCheckedChange={formField.onChange}
                          disabled={field.disabled}
                        />
                        <label
                          htmlFor={field.key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {field.label}
                        </label>
                      </div>
                    );

                  case 'radio':
                    return (
                      <div className="flex flex-wrap gap-4">
                        {field.options?.map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`${field.key}-${option.value}`}
                              name={field.key}
                              value={option.value}
                              checked={formField.value === option.value}
                              onChange={(e) => formField.onChange(e.target.value)}
                              disabled={field.disabled}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label
                              htmlFor={`${field.key}-${option.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    );

                  case 'file':
                    return (
                      <Input
                        type="file"
                        accept={field.accept}
                        multiple={field.multiple}
                        onChange={(e) => {
                          const files = e.target.files;
                          formField.onChange(field.multiple ? files : files?.[0]);
                        }}
                        disabled={field.disabled}
                        className="w-full h-9 text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    );

                  case 'range':
                    return (
                      <div className="w-full">
                        <Input
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          {...commonProps}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{field.min}</span>
                          <span className="font-medium">{formField.value}</span>
                          <span>{field.max}</span>
                        </div>
                      </div>
                    );

                  case 'color':
                    return (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          {...commonProps}
                          className="w-12 h-9 p-1 border rounded cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={formField.value as string}
                          onChange={formField.onChange}
                          placeholder="#000000"
                          className="flex-1 h-9 text-sm"
                          disabled={field.disabled}
                          readOnly={field.readOnly}
                        />
                      </div>
                    );

                  case 'number':
                    return (
                      <Input
                        type="number"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        {...commonProps}
                        className={cn(
                          "w-full text-sm",
                          actualLayout === 'vertical' ? 'h-10' : 'h-9'
                        )}
                      />
                    );

                  case 'date':
                  case 'datetime-local':
                  case 'time':
                  case 'month':
                  case 'week':
                    return (
                      <Input
                        type={field.type}
                        min={field.min}
                        max={field.max}
                        {...commonProps}
                        className="w-full h-9 text-sm"
                      />
                    );

                  case 'password':
                  case 'email':
                  case 'tel':
                  case 'url':
                  case 'search':
                    return (
                      <Input
                        type={field.type}
                        {...commonProps}
                        className="w-full h-9 text-sm"
                      />
                    );

                  default:
                    return (
                      <Input
                        type="text"
                        {...commonProps}
                        className="w-full h-9 text-sm"
                      />
                    );
                }
              })()}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className={cn(
      "search-form-container bg-white rounded-lg border border-gray-200 shadow-sm",
      actualLayout === 'vertical' ? 'p-4' : 'p-5',
      className
    )}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* ProTable QueryFilter 24栅格布局 */}
          <div className={cn(
            "grid grid-cols-24",
            actualLayout === 'vertical' ? 'gap-3' : 'gap-x-6 gap-y-4'
          )}>
            {/* 搜索字段 */}
            {searchFields.slice(0, visibleFieldsCount).map((field, index) => (
              <div 
                key={field.key} 
                className="min-w-0"
                style={{
                  gridColumn: `span ${field.colSize ? Math.min(field.colSize * (24 / fieldsPerRow), 24) : colSpan}`
                }}
              >
                {renderField(field, index)}
              </div>
            ))}
            
            {/* 操作按钮区域 - 24栅格布局，根据字段数计算偏移量 */}
            <div 
              className={cn(
                "flex gap-2 items-center justify-end",
                actualLayout === 'vertical' 
                  ? 'mt-1' 
                  : ''
              )} 
              style={{
                gridColumn: actualLayout === 'vertical' 
                  ? 'span 24'
                  : (() => {
                      const remainder = visibleFieldsCount % fieldsPerRow;
                      if (remainder === 0) {
                        // 当前行已满，操作按钮占满下一行
                        return 'span 24';
                      } else {
                        // 根据剩余空间计算操作按钮的占用格数
                        const remainingFields = fieldsPerRow - remainder;
                        const actionSpan = remainingFields * colSpan;
                        return `span ${actionSpan}`;
                      }
                    })(),
              }}
            >
              <Button 
                type="submit" 
                size="sm" 
                disabled={loading}
                className="h-9 px-4 text-sm font-medium"
              >
                <Search className="w-4 h-4 mr-1.5" />
                查询
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                disabled={loading}
                className="h-9 px-4 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                重置
              </Button>
              
              {/* 展开/收起按钮 */}
              {hasMoreFields && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => {
                    const newCollapsed = !collapsed
                    if (controlledCollapsed === undefined) {
                      setInternalCollapsed(newCollapsed)
                    }
                    onCollapse?.(newCollapsed)
                  }}
                  className="h-9 text-primary hover:text-primary/80 px-2 text-sm font-medium"
                >
                  {collapsed ? (
                    <>
                      展开
                      <ChevronDown className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      收起
                      <ChevronUp className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
